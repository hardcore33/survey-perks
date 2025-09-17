-- Criar tabelas para o sistema de pontos e recompensas

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  points INTEGER DEFAULT 0,
  surveys_completed INTEGER DEFAULT 0,
  referrals_count INTEGER DEFAULT 0,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de perguntas/tarefas
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  type TEXT CHECK (type IN ('rating', 'text')) NOT NULL,
  points INTEGER NOT NULL DEFAULT 100,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de recompensas
CREATE TABLE IF NOT EXISTS rewards (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  points INTEGER NOT NULL,
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de materiais
CREATE TABLE IF NOT EXISTS materials (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('avaliacao', 'leitura', 'manual', 'atendimento')) NOT NULL,
  file_url TEXT,
  content TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de respostas de pesquisa
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  answer TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de solicitações de recompensa
CREATE TABLE IF NOT EXISTS reward_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reward_id INTEGER REFERENCES rewards(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by UUID REFERENCES users(id)
);

-- Tabela de referências
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referred_email TEXT NOT NULL,
  referred_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  points_earned INTEGER DEFAULT 50,
  status TEXT CHECK (status IN ('pending', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de transações de pontos
CREATE TABLE IF NOT EXISTS point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  type TEXT CHECK (type IN ('earned', 'spent', 'referral', 'bonus')) NOT NULL,
  description TEXT,
  reference_id UUID, -- pode referenciar survey_responses, reward_requests, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

-- Políticas para usuários
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para admin
CREATE POLICY "Admins can view all users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Políticas para respostas de pesquisa
CREATE POLICY "Users can view own responses" ON survey_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own responses" ON survey_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para solicitações de recompensa
CREATE POLICY "Users can view own requests" ON reward_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create requests" ON reward_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para referências
CREATE POLICY "Users can view own referrals" ON referrals
  FOR SELECT USING (auth.uid() = referrer_id);

CREATE POLICY "Users can create referrals" ON referrals
  FOR INSERT WITH CHECK (auth.uid() = referrer_id);

-- Políticas para transações de pontos
CREATE POLICY "Users can view own transactions" ON point_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Funções para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rewards_updated_at BEFORE UPDATE ON rewards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_materials_updated_at BEFORE UPDATE ON materials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para atualizar pontos do usuário
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE users 
    SET points = points + NEW.points
    WHERE id = NEW.user_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE users 
    SET points = points - OLD.points
    WHERE id = OLD.user_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ language 'plpgsql';

-- Trigger para atualizar pontos automaticamente
CREATE TRIGGER update_points_on_transaction
  AFTER INSERT OR DELETE ON point_transactions
  FOR EACH ROW EXECUTE FUNCTION update_user_points();

-- Inserir dados iniciais
INSERT INTO questions (text, type, points) VALUES
  ('Como você avalia o ambiente de trabalho?', 'rating', 100),
  ('O que podemos melhorar na empresa?', 'text', 150),
  ('Você recomendaria nossa empresa?', 'rating', 100),
  ('Qual sua satisfação com a liderança?', 'rating', 100),
  ('Descreva sua experiência na empresa', 'text', 200)
ON CONFLICT DO NOTHING;

INSERT INTO rewards (title, description, points, category) VALUES
  ('Vale Combustível R$ 50', 'Crédito para combustível no valor de R$ 50', 500, 'Transporte'),
  ('Almoço Grátis', 'Refeição gratuita no restaurante da empresa', 200, 'Alimentação'),
  ('Dia de Folga Extra', 'Um dia adicional de descanso', 1000, 'Tempo Livre'),
  ('Kit Produtos da Empresa', 'Produtos promocionais da empresa', 300, 'Brindes'),
  ('Curso Online', 'Acesso a curso de capacitação profissional', 800, 'Educação'),
  ('Vale Presente R$ 100', 'Vale presente para uso em lojas parceiras', 800, 'Compras')
ON CONFLICT DO NOTHING;

INSERT INTO materials (title, description, type, content) VALUES
  ('Manual de Integração', 'Guia completo para novos funcionários', 'manual', 'Conteúdo do manual de integração...'),
  ('Política de Qualidade', 'Documento sobre padrões de qualidade', 'leitura', 'Política de qualidade da empresa...'),
  ('Avaliação de Desempenho', 'Formulário de avaliação trimestral', 'avaliacao', 'Critérios de avaliação...'),
  ('Protocolo de Atendimento', 'Procedimentos para atendimento ao cliente', 'atendimento', 'Protocolo de atendimento...')
ON CONFLICT DO NOTHING;