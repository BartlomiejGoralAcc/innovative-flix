public with sharing class TvShowTriggerHandler {
    @future(callout=true)
	public static void handleAfterInsert(Set<Id> showIds) {
        List<TV_Show__c> shows = [SELECT Id, Name FROM TV_Show__c WHERE Id IN :showIds];
        for(TV_Show__c show : shows) {
            show.TMDB_Rating__c = getDataFromTmdb(show.Name);
            System.debug(show.TMDB_Rating__c);
        }
        update shows;
	}

	public static Double getDataFromTmdb(String searchTerm) {
        Double rating = 0.0;
        Http server = new Http(); 
		HttpRequest req = new HttpRequest();
        //TODO zamienić na constant
        String urlEncoded = 'https://api.themoviedb.org/3/search/tv?api_key=d34ebc5a4ff39a7a52f8c53d4efd09b2&language=en-US&page=1&query=' + EncodingUtil.urlEncode(searchTerm, 'UTF-8');
        System.debug(urlEncoded);
        req.setEndpoint(urlEncoded);
        req.setMethod('GET');
        HttpResponse resp = server.send(req); 
        if(resp.getStatusCode() == 200) {
            Map<String, Object> mapka = (Map<String, Object>) Json.deserializeUntyped(resp.getBody());
            List<Object> l = ((List<Object>)mapka.get('results'));
            if (!l.isEmpty()) {
                Object o = l[0];
                rating = (Double)(((Map<String, Object>)o).get('vote_average'));
            }
        } 
        return rating;
    }
}
