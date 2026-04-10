-- Szenario-Karten (statisch)
CREATE TABLE scenarios (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL
);

-- Daten-Karten (statisch)
CREATE TABLE data_cards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  examples TEXT NOT NULL
);

-- Reflexions-Karten (statisch)
CREATE TABLE reflection_cards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  condition TEXT NOT NULL
);

-- Eingereichte Ideen
CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  session_id TEXT NOT NULL,
  scenario_id TEXT REFERENCES scenarios(id),
  data_card_1_id TEXT REFERENCES data_cards(id),
  data_card_2_id TEXT REFERENCES data_cards(id),
  reflection_id TEXT REFERENCES reflection_cards(id),
  app_name TEXT NOT NULL,
  description TEXT NOT NULL,
  opportunity TEXT NOT NULL,
  risk TEXT NOT NULL,
  total_chips INTEGER DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_seed BOOLEAN DEFAULT false
);

-- Bewertungen
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  reviewer_session_id TEXT NOT NULL,
  idea_id UUID REFERENCES ideas(id),
  chips INTEGER NOT NULL CHECK (chips >= 0 AND chips <= 10)
);

-- Indizes
CREATE INDEX idx_ideas_total_chips ON ideas(total_chips DESC);
CREATE INDEX idx_ideas_review_count ON ideas(review_count ASC);
CREATE INDEX idx_reviews_idea_id ON reviews(idea_id);
CREATE INDEX idx_reviews_session ON reviews(reviewer_session_id);

-- RLS
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ideas_select" ON ideas FOR SELECT USING (true);
CREATE POLICY "ideas_insert" ON ideas FOR INSERT WITH CHECK (true);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_insert" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "reviews_select" ON reviews FOR SELECT USING (true);

ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "scenarios_select" ON scenarios FOR SELECT USING (true);

ALTER TABLE data_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "data_cards_select" ON data_cards FOR SELECT USING (true);

ALTER TABLE reflection_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reflection_cards_select" ON reflection_cards FOR SELECT USING (true);

-- Trigger: Chips aggregieren
CREATE OR REPLACE FUNCTION update_idea_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE ideas
  SET total_chips = (
    SELECT COALESCE(SUM(chips), 0) FROM reviews WHERE idea_id = NEW.idea_id
  ),
  review_count = (
    SELECT COUNT(*) FROM reviews WHERE idea_id = NEW.idea_id
  )
  WHERE id = NEW.idea_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_idea_stats
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_idea_stats();
