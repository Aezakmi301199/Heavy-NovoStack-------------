

CREATE OR REPLACE VIEW roles AS 
    SELECT role.role as role,userrole.user_id as user_id
    FROM userrole 
    LEFT JOIN userclient ON userrole.user_id = userclient.id
    LEFT JOIN role ON userrole.role_id = role.id;



