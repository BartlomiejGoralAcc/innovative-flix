public with sharing class SeasonController {
    @AuraEnabled(Cacheable=true)
    public static Season__c[] getSeasonByShowId(String showId) {
        return [
            SELECT
                Id,
                Number__c,
                Description__c,
                (SELECT Id, Name FROM Episodes__r)
            FROM Season__c
            WHERE TV_Show__c = :showId
            ORDER BY Number__c ASC
        ];
    }

}
