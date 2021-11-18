public with sharing class ShowController {
    @AuraEnabled(Cacheable=true)
    public static TV_Show__c[] getShowById(String showId) {
        TV_Show__c[] result = [
            SELECT
                Id,
                Name,
                Description__c,
                Logo_URL__c,
                Genre__c
            FROM TV_Show__c
            WHERE Id = :showId
        ];

        System.debug(result[0]);
        System.debug(result[0].Genre__c);
        return result;
    }

    @AuraEnabled(Cacheable=true)
    public static TV_Show__c[] getAllShows() {
        return [
            SELECT
                Id,
                Name,
                Description__c,
                Logo_URL__c,
                Genre__c
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
                Logo_URL__c,
                Genre__c
            FROM TV_Show__c
            WHERE Name LIKE :searchTerm
            ORDER BY Name
            LIMIT 50
        ];
    }
}
