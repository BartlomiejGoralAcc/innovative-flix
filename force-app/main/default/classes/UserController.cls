public with sharing class UserController {
    @AuraEnabled
    public static Boolean canModifyFeatured() {
        List<Profile> profiles = [Select Id From Profile Where Name='System Administrator' LIMIT 1];
        Boolean result = UserInfo.getProfileId() == profiles[0].Id;
        System.debug('can?: ' + result);
        return result;
    }
}
