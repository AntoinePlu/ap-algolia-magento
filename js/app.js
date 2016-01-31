var search = instantsearch({
      appId: 'latency',
      apiKey: 'db2af085e1f7dc80f93178182b76ddca',
      indexName: 'magento-connect'
    });

    //var humanize = require('humanize');

    var noResultsTemplate =
    '<div class="text-center">No results found matching <strong>{{query}}</strong></div>';

    var hitTemplate =
    '<article class="content-article">' +
      '<a href="{{link}}">' +
        '<div class="article-infos">' +
          '<image src="{{thumbnail_url}}">' +
          '<div class="article-description">' +
            '<h3 class="media-heading">{{{_highlightResult.title.value}}}</h3>' +
            '<p class="media-desc">{{{_highlightResult.short_description.value}}}</p>' +
          '</div>' +
        '</div>' +
        '<div class="article-details">' +
          '<div class="content-rating">{{score}}</div>' +
          '<div class="content-popularity">{{popularity}}</div>' +
          '<div class="content-price">{{price}}</div>' +
        '</div>' +
      '</a>' +
    '</article>';


    // Search
    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#search-box',
        placeholder: 'Search extensions by name or description...',
        autofocus: true,
        poweredBy: false,
      })
    );

    // Results
    search.addWidget(
      instantsearch.widgets.hits({
        container: '#hits-container',
        templates: {
          empty: noResultsTemplate,
          item: hitTemplate
        },
        hitsPerPage: 20,
        transformData: function(hit) {
          hit.score = Math.round(hit.score*10)/10;
          //hit.score = humanize(hit.score);
          if (hit.price === 0){
            hit.price = "FREE";
          }
          else {
            hit.price = "$" + hit.price;
          }
          return hit;
        }
      })
    );

    // Pagination
    search.addWidget(
      instantsearch.widgets.pagination({
        container: '#pagination-container',
        maxPages: 40,
        // default is to scroll to 'body', here we disable this behavior
        scrollTo: false
      })
    );

    /*
    // Facets for Price
    search.addWidget(
      instantsearch.widgets.priceRanges({
        container: '#price-ranges',
        attributeName: 'price',
        labels: {
          currency: '$',
          separator: 'to',
          button: 'Go'
        },
        templates: {
          header: 'Price',
        }
      })
    );
    */

    /*
    // Facets for Rating
    search.addWidget(
      instantsearch.widgets.starRating({
        container: '#stars',
        attributeName: 'rating',
        max: 5,
        labels: {
          andUp: ''
        }
      })
    );
    */

    /*
    // Sort by Selector
    search.addWidget(
      instantsearch.widgets.sortBySelector({
        container: '#sort-by-container',
        indices: [
          {name: 'instant_search', label: 'Most relevant'},
          {name: 'instant_search_price_asc', label: 'Lowest price'},
          {name: 'instant_search_price_desc', label: 'Highest price'}
          ]
        })
      );
    */

    // Stats
    search.addWidget(
      instantsearch.widgets.stats({
        container: '#stats-container',
        templates: {
          body: '<p>{{nbHits}} Extensions found in {{processingTimeMS}}ms, by <a href="http://www.algolia.com">Algolia</a></p>'
        }
      })
    );

    search.start();