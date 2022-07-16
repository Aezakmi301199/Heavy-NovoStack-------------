CREATE OR REPLACE FUNCTION fnaddstrole ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            INSERT INTO userrole (user_id,role_id) VALUES (new.id,1);
            RETURN NEW;
        END;
        $$;


CREATE OR REPLACE FUNCTION fnaddusersocialnetworkandpath ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            INSERT INTO usersocialnetworkandpath (user_id) VALUES (new.id);
            RETURN NEW;
        END;
        $$;

CREATE OR REPLACE FUNCTION fndeleteadvertismentpicture ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            DELETE FROM pictureadvertisment WHERE advert_id = old.id;
            RETURN OLD;
        END;
        $$;
CREATE OR REPLACE FUNCTION fndeleteadvertismentdopsettings ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            DELETE FROM advertismentdopsettings WHERE advert_id = old.id;
            RETURN OLD;
        END;
        $$;
CREATE OR REPLACE FUNCTION fndeletesparesbycategory ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            DELETE FROM spares WHERE category = old.category;
            RETURN OLD;
        END;
        $$;
CREATE OR REPLACE FUNCTION fndeleteundercategoriesbycategory ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            DELETE FROM undercategories WHERE category = old.category;
            RETURN OLD;
        END;
        $$;

 CREATE OR REPLACE FUNCTION fndeletespareswithundercategory()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            DELETE FROM spares WHERE subcategory = old.subcategory AND category = old.category;
            RETURN OLD;
        END;
        $$;       

 CREATE OR REPLACE FUNCTION fndeletebrandbycategory()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            DELETE FROM brand WHERE category = old.category;
            RETURN OLD;
        END;
        $$;  

CREATE OR REPLACE FUNCTION fndeleteadvertismentbycategory ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            DELETE FROM advertisment WHERE category = old.category;
            RETURN OLD;
        END;
        $$;      
  
CREATE OR REPLACE FUNCTION fndeleteaddvertinbasketbyadvert ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            DELETE FROM basket WHERE advert_id = old.id;
            RETURN OLD;
        END;
        $$;   
/*
CREATE OR REPLACE FUNCTION fncreateitempicture ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            INSERT INTO pictureadvertisment (advert_id) VALUES (new.id);
            RETURN NEW;
        END;
        $$;
*/



/*
CREATE OR REPLACE FUNCTION fnadduserinfoid ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            INSERT INTO userinfo (user_id) VALUES (new.id);
            RETURN NEW;
        END;
        $$;

CREATE OR REPLACE FUNCTION fnaddusergeolocationid ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            INSERT INTO usergeolocation (user_id) VALUES (new.id);
            RETURN NEW;
        END;
        $$;

CREATE OR REPLACE FUNCTION fnadduseravatarid ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            INSERT INTO useravatar (user_id) VALUES (new.id);
            RETURN NEW;
        END;
        $$;

CREATE OR REPLACE FUNCTION fnaddusersocialnetworkid ()
    RETURNS TRIGGER
    LANGUAGE 'plpgsql'
    AS 
        $$
        BEGIN
            INSERT INTO usersocialnetwork (user_id) VALUES (new.id);
            RETURN NEW;
        END;
        $$;

*/
