trigger TvShowTrigger on TV_Show__c (after insert) {
    if(Trigger.isAfter) {
        if(Trigger.isInsert) {
            TvShowTriggerHandler.handleAfterInsert(Trigger.newMap.keySet());
        }
    }
}