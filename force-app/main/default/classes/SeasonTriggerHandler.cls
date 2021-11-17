public with sharing class SeasonTriggerHandler {
	public static void handleBeforeInsert(List<Season__c> seasons) {
        for(Season__c season : seasons) {
            season.SeasonId_Number__c = '' + season.TV_Show__c + season.Number__c;
        }
	}
    
}