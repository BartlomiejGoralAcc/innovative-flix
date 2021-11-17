trigger SeasonTrigger on Season__c (before insert, before update) {
	if(Trigger.isBefore) {
        if(Trigger.isInsert || Trigger.isUpdate) {
            SeasonTriggerHandler.handleBeforeInsert(Trigger.new);
        }
    }
}