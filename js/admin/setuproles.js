//change these to those listed in your Parse account
Parse.initialize("your Parse Application ID here", "Your Parse Javascript Key here");

function setupRoles() {
    "use strict";
    var adminRoleSetup = false,
        teacherRoleSetup = false,
        studentRoleSetup = false;
    //create admin role
    var adminACL = new Parse.ACL();
    adminACL.setPublicReadAccess(true);
    var adminRole = new Parse.Role("Admin", adminACL);
    adminRole.save().then(function(obj) { adminRoleSetup = true;
                                         console.log("Admin role created successfully"); },
                          function (error) {console.log("Problem created admin role: " + error); });
    
    //create teacher role
    var teacherACL = new Parse.ACL();
    teacherACL.setPublicReadAccess(true);
    var teacherRole = new Parse.Role("Teacher", teacherACL);
    teacherRole.save().then(function(obj) { teacherRoleSetup = true;
                                           console.log("Teacher role created successfully"); },
                          function (error) { console.log("Problem creating teacher role: " + error); });
    
    //create student role
    var studentACL = new Parse.ACL();
    studentACL.setPublicReadAccess(true);
    var studentRole = new Parse.Role("Student", studentACL);
    studentRole.save().then(function(obj) { studentRoleSetup = true; console.log("Student role created successfully"); },
                            function (error) { console.log("Problem creating student role: " + error); });
    
    var Setting = Parse.Object.extend("Settings");
    var admin = new Setting();
    
    var adminSettingACL = new Parse.ACL();
    adminSettingACL.setRoleReadAccess("Admin", true);
    adminSettingACL.setRoleWriteAccess("Admin",true);
    admin.set("item", "adminRoleSetup");
    admin.set("value", adminRoleSetup);
    
    var teacher = new Setting();
    
    var teacherSettingACL = new Parse.ACL();
    teacherSettingACL.setRoleReadAccess("Admin", true);
    teacherSettingACL.setRoleWriteAccess("Admin",true);
    teacher.set("item", "teacherRoleSetup");
    teacher.set("value", teacherRoleSetup);
    
    var student = new Setting();
    var studentSettingACL = new Parse.ACL();
    studentSettingACL.setRoleReadAccess("Admin", true);
    studentSettingACL.setRoleWriteAccess("Admin",true);
    student.set("item", "studentRoleSetup");
    student.set("value", studentRoleSetup);
    
    admin.save().then(function(obj) { console.log("Admin role creation status recorded");},
                     function(error) { console.log("Admin role creation status not recorded - " + error);});
    
    teacher.save().then(function(obj) { console.log("Teacher role creation status recorded");},
                      function(error) { console.log("Teacher role creation status not recorded - " + error);});
    
    student.save().then(function(obj) { console.log("Student creation status recorded");},
                      function(error) { console.log("Student role creation status not recorded - " + error);});
    
    
        

}