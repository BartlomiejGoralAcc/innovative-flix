public with sharing class EpisodeMarkController {
    @AuraEnabled(Cacheable=true)
    public static Episode_Mark__c[] getMarks(String episodeId) {
        String userId = UserInfo.getUserId();
        return [
            SELECT
                Id,
                Episode__c,
                Rating__c
            FROM Episode_Mark__c
            WHERE (OwnerId = :userId AND Episode__c = :episodeId)
        ];
    }
}
