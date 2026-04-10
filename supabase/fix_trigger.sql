-- Fix: Trigger-Funktion als SECURITY DEFINER ausführen,
-- damit der UPDATE auf ideas die RLS-Policies umgeht.
-- Ohne SECURITY DEFINER schlägt das UPDATE fehl, weil keine
-- UPDATE-Policy auf ideas existiert.

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
$$ LANGUAGE plpgsql SECURITY DEFINER;
