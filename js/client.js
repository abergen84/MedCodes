var validateICDCodes = function(codes, codeSet) {
  for (var i in codes) {
    var entry = codes[i];
    if (!entry.hasOwnProperty('code') ||
        !entry.hasOwnProperty('description')) {
      alert('fuck!!!');
    }
  }
  console.log(codeSet + ' checks out ok...found ' + codes.length + ' codes');
};

var icd9Codes = [];
var icd10Codes = [];

$.getJSON('./codes/icd9_diagnosis_codes.json', function(json) {
    console.log('loaded icd9 json...');
    validateICDCodes(json, 'icd9');
    Array.prototype.push.apply(icd9Codes, json);
});

$.getJSON('./codes/icd10_diagnosis_codes.json', function(json) {
    console.log('loaded icd10 json...');
    validateICDCodes(json, 'icd10');
    Array.prototype.push.apply(icd10Codes, json);
});

var searchICDCodes = function(codesToSearch, searchTerm) {
    var termLower = searchTerm.toLowerCase();
    var matches = [];
    for (var i in codesToSearch) {
        var entry = codesToSearch[i];
        var code = entry.code;
        var descr = entry.description;
        if (descr.toLowerCase().indexOf(termLower) >= 0) {
            matches.push(code + ' -- ' + descr);
        }
    }
    return matches;
}

var searchICD9 = function(searchTerm) {
    return searchICDCodes(icd9Codes, searchTerm);
};

var searchICD10 = function(searchTerm) {
    return searchICDCodes(icd10Codes, searchTerm);
};


//RELATED TO HTML

var doSearch = function(codeFamily) {
              var searchTerm = null;
              var searchFunc = null;
              switch(codeFamily) {
                  case 'icd9':
                      searchTerm = document.getElementById('icd9SearchTerm').value;
                      searchFunc = searchICD9;
                      break;
                  case 'icd10':
                      searchTerm = document.getElementById('icd10SearchTerm').value;
                      searchFunc = searchICD10;
                      break;
                  default:
                      throw "unrecognized code family: " + codeFamily;
                      
              }
              var results = searchFunc(searchTerm);
              console.log(results);
              updateResults(results);
          };
          var updateResults = function(results) {
              var resultsHtml = '<ul>'
              for (var i in results) {
                  resultsHtml += '<li>' + results[i] + '</li>';
              }
              resultsHtml += '</ul>';
              document.getElementById('searchResults').innerHTML = resultsHtml;
              document.getElementById('searchResultsHeader').style.visibility = 'visible';
          };






//WORKS USING TYPEAHEAD, ALBEIT LOCALSTORAGE TOO SMALL TO STORE ALL INFO AND THUS GIVES ERROR CODES


// var substringMatcher = function(strs) {
//   return function findMatches(q, cb) {
//     var matches, substrRegex;
 
//     // an array that will be populated with substring matches
//     matches = [];
 
//     // regex used to determine if a string contains the substring `q`
//     substrRegex = new RegExp(q, 'i');
 
//     // iterate through the pool of strings and for any string that
//     // contains the substring `q`, add it to the `matches` array
//     $.each(strs, function(i, str) {
//       if (substrRegex.test(str)) {
//         // the typeahead jQuery plugin expects suggestions to a
//         // JavaScript object, refer to typeahead docs for more info
//         matches.push({ value: str });
//       }
//     });
 
//     cb(matches);
//   };
// };

// var icd9 = new Bloodhound({
// 	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('description'),
// 	queryTokenizer: Bloodhound.tokenizers.whitespace,
// 	prefetch: './codes/icd9_diagnosis_codes.json',
// 	remote: './codes/icd9_diagnosis_codes.json'
// });

// var icd10 = new Bloodhound({
// 	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('description'),
// 	queryTokenizer: Bloodhound.tokenizers.whitespace,
// 	prefetch: './codes/icd10_diagnosis_codes.json',	
// 	remote: './codes/icd10_diagnosis_codes.json'
// }); 

// icd9.initialize();
// icd10.initialize();

// $('#dataset .typeahead').typeahead({
// 	highlight: true,
// 	hint: true
// },
// 	{
// 	name: 'icd9codes',
// 	displayKey: 'description',
// 	source: icd9.ttAdapter(),
// 	templates: {
// 		header: '<h3 class="icd9header">ICD-9 Codes</h3>'
// 	}
// },
// {
// 	name: 'icd10codes',
// 	displayKey: 'description',
// 	source: icd10.ttAdapter(),
// 	templates: {
// 		header: '<h3 class="icd10header">ICD-10 Codes</h3>'
// 	}
// });
