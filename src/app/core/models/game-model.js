(function() {
  'use strict';

  angular.module('finnplay.models.game', []).service('Game', function($q, $ajax, $filter, $rootScope, Fn, Const, User){
    var model = this;

    model.getRatio = function (id) {
      return 'EXT.GAME.RATIO.' + id;
    };

    model.getReview = function (id) {
      return 'EXT.GAME.REVIEW.' + id;
    };

    model.getTitle = function (id) {
      const title = $filter('translate')('EXT.GAME.NAME.' + id)
      return title.indexOf('EXT.GAME.NAME.') > -1 ? '' : title;
    };

    model.getProviderTitle = function (id) {
      return 'EXT.GAME.PROVIDER.' + id;
    };

    model.getDescriptionText = function (id) {
      return (Const.defaultTranslation.EXT.GAME.DESCRIPTION || {}).hasOwnProperty(id) ? 'EXT.GAME.DESCRIPTION.' + id : '';
    };

    model.getGroupTitle = function (name) {
      return 'EXT.GAME.GROUP.' + Fn.snakeCase(Fn.camelCase(name), '_', true);
    };

    function removeBlockedGames (games) {
      if (!games) return $q.when([]);

      var blockedCountriesString = $filter('translate')('EXT.BLOCK.COUNTRIES') || '';
      var blockedCountries = blockedCountriesString ? blockedCountriesString.replace(/\s/g, '').split(',') : [];

      if (!blockedCountriesString || !blockedCountries.length) return $q.when(games);

      return User.getCountry().then(function (country) {

        if (blockedCountries.indexOf(country) > -1) {
          var blockedIds = JSON.parse('[' + $filter('translate')('EXT.BLOCK.GAMES') + ']') || [];
          return !blockedIds.length ? games : games.filter(function (game) {
            return blockedIds.indexOf(game.gameId) < 0;
          });
        }

        return games;
      });
    }

    model.getGamesByGroupName = function (name) {
      return new Promise(function (resolve) {
        var games = [{"name":"YGEasterIsland","friendlyName":"easter-island","gameId":510087,"provider":9,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96100,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":103,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"YGJokerizer","friendlyName":"jokerizer","gameId":510001,"provider":9,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.88800,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":10,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"G170299","friendlyName":"finn-and-the-swirly-spin","gameId":170299,"provider":11,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96620,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":null,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"G170095","friendlyName":"jack-and-the-beanstalk","gameId":170095,"provider":11,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":false,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96300,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":20,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"G170088","friendlyName":"gonzo-s-quest","gameId":170088,"provider":11,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":false,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96100,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":20,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"G170191","friendlyName":"starburst","gameId":170191,"provider":11,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":false,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96100,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":10,"mobileVersion":false,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGHugo","friendlyName":"hugo","gameId":60432,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96400,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":10,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGFlyingPigs","friendlyName":"flying-pigs","gameId":60433,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.93730,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":null,"mobileVersion":true,"freeRounds":false,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGBugsParty","friendlyName":"bugs-party","gameId":60434,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.94240,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":null,"mobileVersion":true,"freeRounds":false,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGFireJoker","friendlyName":"fire-joker","gameId":60426,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96150,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":5,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGBookOfDead","friendlyName":"book-of-dead","gameId":60427,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96210,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":5,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGSailsOfGold","friendlyName":"sails-of-gold","gameId":60428,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96250,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":10,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGGoldenCaravan","friendlyName":"golden-caravan","gameId":60429,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96190,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":10,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGGrimMuerto","friendlyName":"grim-muerto","gameId":60430,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.97000,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":20,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGAztecPrincess","friendlyName":"aztec-princess","gameId":60431,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.94170,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":20,"mobileVersion":false,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGCloudQuest","friendlyName":"cloud-quest","gameId":60425,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96520,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":1,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGSambaCarnival","friendlyName":"samba-carnival","gameId":60424,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.95790,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":15,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGHappyHalloween","friendlyName":"happy-halloween","gameId":60420,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96500,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":50,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGRageToRiches","friendlyName":"rage-to-riches","gameId":60421,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.97120,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":20,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGChristmasJoker","friendlyName":"christmas-joker","gameId":60422,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96980,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":5,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGWizardOfGems","friendlyName":"wizard-of-gems","gameId":60423,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96660,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":20,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"LadyOfFortune","friendlyName":"lady-of-fortune","gameId":60200,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96000,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":15,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BeatMe","friendlyName":"beat-me","gameId":60300,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.97000,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":null,"mobileVersion":true,"freeRounds":false,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"GoldenTicket","friendlyName":"golden-ticket","gameId":60409,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96730,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":1,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"Gemix","friendlyName":"gemix","gameId":60410,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96750,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":1,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"TowerQuest","friendlyName":"tower-quest","gameId":60411,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96240,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":20,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"MerryXmas","friendlyName":"merry-xmas","gameId":60412,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.95790,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":15,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"GoldenLegend","friendlyName":"golden-legend","gameId":60413,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96500,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":50,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"Pimped","friendlyName":"pimped","gameId":60414,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96510,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":10,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"EasterEggs","friendlyName":"easter-eggs","gameId":60415,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96750,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":20,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGRoyalMasquerade","friendlyName":"royal-masquerade","gameId":60416,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96510,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":10,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGWildNorth","friendlyName":"wild-north","gameId":60417,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96550,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":1,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGSpinParty","friendlyName":"spin-party","gameId":60418,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96500,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":10,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"PGEyeOfTheKraken","friendlyName":"eye-of-the-kraken","gameId":60419,"provider":3,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96410,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":1,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSGreat88","friendlyName":"great-88","gameId":80237,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.95360,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSCharmsAndClovers","friendlyName":"charms-clovers","gameId":80238,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96310,"jackpotContribution":0.02000,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":40,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{"jackpotSlider":"true"},"avgRating":null,"groups":[]},{"name":"BSBirds","friendlyName":"birds","gameId":80236,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96480,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":null,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSFrankenslotsMonster","friendlyName":"frankenslot-s-monster","gameId":80235,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96830,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":20,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSTipsyTourist","friendlyName":"the-tipsy-tourist","gameId":80230,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.97100,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":20,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSAlkemorsTower","friendlyName":"alkemor-s-tower","gameId":80231,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.94960,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":null,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BS4Seasons","friendlyName":"4-seasons","gameId":80234,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.95300,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSAChristmasCarol","friendlyName":"a-christmas-carol","gameId":80232,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.94580,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":25,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSSugarPop","friendlyName":"sugar-pop","gameId":80215,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.97600,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":null,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSGoodGirlBadGirl","friendlyName":"good-girl-bad-girl","gameId":80216,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.97790,"jackpotContribution":0.01000,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{"jackpotSlider":"true"},"avgRating":null,"groups":[]},{"name":"BSMoreGoldDigging","friendlyName":"more-gold-diggin","gameId":80217,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.94530,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":25,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSGypsyRose","friendlyName":"gypsy-rose","gameId":80218,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.97630,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSANightinParisJP","friendlyName":"a-night-in-paris-jackpot","gameId":80219,"provider":6,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":true,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96920,"jackpotContribution":0.01000,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{"jackpotSlider":"true"},"avgRating":null,"groups":[]},{"name":"BSEnchantedJP","friendlyName":"enchanted-jackpot","gameId":80220,"provider":6,"supplier":null,"ratio":1.41,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.89400,"jackpotContribution":0.01000,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{"jackpotSlider":"true"},"avgRating":null,"groups":[]},{"name":"BSSlotfatherJP","friendlyName":"slotfather-jackpot","gameId":80221,"provider":6,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.95690,"jackpotContribution":0.01000,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{"jackpotSlider":"true"},"avgRating":null,"groups":[]},{"name":"BSItCameFromVenusJP","friendlyName":"it-came-from-venus-jackpot","gameId":80222,"provider":6,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.95800,"jackpotContribution":0.01000,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{"jackpotSlider":"true"},"avgRating":null,"groups":[]},{"name":"BSFruitZen","friendlyName":"fruit-zen","gameId":80223,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.97300,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":10,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSDrJekyllMrHyde","friendlyName":"dr-jekyll-mr-hyde","gameId":80225,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96170,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSTycoonsPlus","friendlyName":"tycoons-plus","gameId":80226,"provider":6,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.95340,"jackpotContribution":0.01000,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{"jackpotSlider":"true"},"avgRating":null,"groups":[]},{"name":"BSCuriousMachinePlus","friendlyName":"curious-machine-plus","gameId":80227,"provider":6,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.95500,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSPuppyLovePlus","friendlyName":"puppy-love-plus","gameId":80228,"provider":6,"supplier":null,"ratio":1.32,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.97230,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":20,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"BSPinocchio","friendlyName":"pinocchio","gameId":80229,"provider":6,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96530,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":15,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]},{"name":"G170316","friendlyName":"hotline","gameId":170316,"provider":11,"supplier":null,"ratio":1.78,"gameDisabled":false,"promoMoneyEnabled":true,"hideDemoUrl":false,"newGame":null,"freeSpins":null,"jackpotGame":null,"liveGame":null,"favourite":false,"recentGames":false,"rtp":0.96130,"jackpotContribution":null,"mobile":false,"bingoGame":null,"maxCashBetLimit":null,"maxPromoBetLimit":null,"turnoverMultiplier":1.00,"lines":30,"mobileVersion":true,"freeRounds":true,"blockedCountryListId":null,"metadata":{},"avgRating":null,"groups":[]}];
        return resolve(removeBlockedGames(games))
      });
    };

    model.getGameImageUrl = function (name, provider) {
      return '/assets/images/games/provider-id-1/AvalonII.png';
    }

  });

})();