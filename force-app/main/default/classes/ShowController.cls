public with sharing class ShowController {
    @AuraEnabled(Cacheable=true)
    public static TV_Show__c[] getShowById(String showId) {
        TV_Show__c[] result = [
            SELECT
                Id,
                Name,
                Description__c,
                Logo_URL__c,
                Genre__c,
                Trailer_URL__c,
                Country__c,
                Release_Year__c,
                Number_Of_Episodes__c,
                Creator__c
            FROM TV_Show__c
            WHERE Id = :showId
        ];

        return result;
    }

    @AuraEnabled
    public static TV_Show__c[] getAllShows(Boolean all) {
        // Database.query(soqlQuery);
        if (all) {
            return [
                SELECT
                    Id,
                    Name,
                    Description__c,
                    Logo_URL__c,
                    Genre__c,
                    Trailer_URL__c,
                    Country__c,
                    Release_Year__c,
                    Number_Of_Episodes__c,
                    Creator__c
                FROM TV_Show__c
                ORDER BY Name
            ]; 
        } else {
            return [
                SELECT
                    Id,
                    Name,
                    Description__c,
                    Logo_URL__c,
                    Genre__c,
                    Trailer_URL__c,
                    Country__c,
                    Release_Year__c,
                    Number_Of_Episodes__c,
                    Creator__c
                FROM TV_Show__c
                ORDER BY Id ASC
                LIMIT 4
            ];
        }
        
    }

    @AuraEnabled(Cacheable=true)
    public static TV_Show__c[] getFeaturedShows() {
        return [
            SELECT
                Id,
                Name,
                Description__c,
                Logo_URL__c,
                Genre__c,
                Trailer_URL__c,
                Country__c,
                Release_Year__c,
                Number_Of_Episodes__c,
                Creator__c
            FROM TV_Show__c
            WHERE Featured__c = True
            ORDER BY Name
            LIMIT 5
        ];
    }

    @AuraEnabled
    public static TV_Show__c[] searchShows(String searchTerm, Boolean all) {
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAllShows(all);
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
                Genre__c,
                Trailer_URL__c,
                Country__c,
                Release_Year__c,
                Number_Of_Episodes__c,
                Creator__c
            FROM TV_Show__c
            WHERE Name LIKE :searchTerm
            ORDER BY Name
            LIMIT 4
        ];
    }


}
