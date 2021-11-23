public with sharing class EpisodeTriggerHandler {
	public static void handleBeforeInsertUpdate(List<Episode__c> episodes) {
        for(Episode__c episode : episodes) {
            episode.SeasonId_Number__c = '' + episode.Season__c + episode.Number__c;
        }
	}
}