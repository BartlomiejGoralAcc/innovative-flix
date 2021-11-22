trigger EpisodeMarkTrigger on Episode_Mark__c (before insert) {
	if(Trigger.isBefore) {
        if(Trigger.isInsert) {
            EpisodeMarkTriggerHandler.handleBeforeInsert(Trigger.new);
        }
    }
}