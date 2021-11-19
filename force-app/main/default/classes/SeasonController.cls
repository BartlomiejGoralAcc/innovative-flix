public with sharing class SeasonController {
    @AuraEnabled(Cacheable=true)
    public static Season__c[] getSeasonByShowId(String showId) {
        // TODO add validation rule to make description__c required
        return [
            SELECT
                Id,
                Number__c,
                Description__c,
                (SELECT Id, Name, Number__c, Release_Date__c, Description__c, Duration_min__c FROM Episodes__r ORDER BY Number__c ASC)
            FROM Season__c
            WHERE TV_Show__c = :showId
            ORDER BY Number__c ASC
        ];
    }

}
