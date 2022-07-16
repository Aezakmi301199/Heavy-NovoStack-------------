CREATE TRIGGER addstrole 
    AFTER INSERT ON userclient
    FOR EACH ROW EXECUTE FUNCTION fnaddstrole();

CREATE TRIGGER addusersocialnetworkandpath 
    AFTER INSERT ON userclient
    FOR EACH ROW EXECUTE FUNCTION fnaddusersocialnetworkandpath();

CREATE TRIGGER deleteadvertismentpicture 
    BEFORE DELETE ON advertisment
    FOR EACH ROW EXECUTE FUNCTION fndeleteadvertismentpicture();

CREATE TRIGGER deleteadvertismentdopsettings 
    BEFORE DELETE ON advertisment
    FOR EACH ROW EXECUTE FUNCTION fndeleteadvertismentdopsettings();
CREATE TRIGGER deleteaddvertinbasketbyadvert 
    BEFORE DELETE ON advertisment
    FOR EACH ROW EXECUTE FUNCTION fndeleteaddvertinbasketbyadvert();      
CREATE TRIGGER deletesparesbycategory 
    BEFORE DELETE ON category
    FOR EACH ROW EXECUTE FUNCTION fndeletesparesbycategory();
CREATE TRIGGER deleteundercategoriesbycategory 
    BEFORE DELETE ON category
    FOR EACH ROW EXECUTE FUNCTION fndeleteundercategoriesbycategory();
CREATE TRIGGER deletebrandbycategory 
    BEFORE DELETE ON category
    FOR EACH ROW EXECUTE FUNCTION fndeletebrandbycategory();        
CREATE TRIGGER deleteadvertismentbycategory 
    BEFORE DELETE ON category
    FOR EACH ROW EXECUTE FUNCTION fndeleteadvertismentbycategory();    
    
  

    
/*

CREATE TRIGGER createitempicture 
    AFTER INSERT ON advertisment
    FOR EACH ROW EXECUTE FUNCTION fncreateitempicture();

*/

/*
CREATE TRIGGER adduserinfoid 
    AFTER INSERT ON userclient
    FOR EACH ROW EXECUTE FUNCTION fnadduserinfoid();

CREATE TRIGGER addusergeolocationid 
    AFTER INSERT ON userclient
    FOR EACH ROW EXECUTE FUNCTION fnaddusergeolocationid();

CREATE TRIGGER fnadduseravatarid 
    AFTER INSERT ON userclient
    FOR EACH ROW EXECUTE FUNCTION fnadduseravatarid();

CREATE TRIGGER addusersocialnetworkid 
    AFTER INSERT ON userclient
    FOR EACH ROW EXECUTE FUNCTION fnaddusersocialnetworkid();
*/
