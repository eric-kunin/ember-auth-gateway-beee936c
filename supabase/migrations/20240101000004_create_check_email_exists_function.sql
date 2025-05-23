
CREATE OR REPLACE FUNCTION check_email_exists_simple(p_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE email = p_email
    LIMIT 1
  );
END;
$$;
