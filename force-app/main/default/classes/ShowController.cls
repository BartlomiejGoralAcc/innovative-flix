public with sharing class ShowController {
    @AuraEnabled(Cacheable=true)
    public static TV_Show__c[] getShowById(String showId) {
        return [
            SELECT
                Id,
                Name,
                Description__c,
                Logo_URL__c
            FROM TV_Show__c
            WHERE Id = :showId
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static TV_Show__c[] getAllShows() {
        return [
            SELECT
                Id,
                Name,
                Description__c,
                Logo_URL__c
            FROM TV_Show__c
            ORDER BY Name
            LIMIT 50
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static TV_Show__c[] searchShows(String searchTerm) {
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAllShows();
        }
        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';
        // Execute search query
        return [
            SELECT
                Id,
                Name,
                Description__c,
                Logo_URL__c
            FROM TV_Show__c
            WHERE Name LIKE :searchTerm
            ORDER BY Name
            LIMIT 50
        ];
    }
}
