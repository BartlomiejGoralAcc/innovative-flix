public with sharing class EpisodeMarkTriggerHandler {
	public static void handleBeforeInsert(List<Episode_Mark__c> marks) {
        for(Episode_Mark__c mark : marks) {
            mark.OwnerId_Episode__c = '' + UserInfo.getUserId() + mark.Episode__c;
        }
	}
    
}