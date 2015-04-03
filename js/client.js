// $(function(){

// 	var countries = ['France', 'Czech Republic', 'England', 'Germany', 'Spain']

// 	$('#countries .typeahead').typeahead({
// 		hint: true,
// 		highlight: true,
// 		minLength: 1
// 	},
// 	{
// 	name: 'countries',
// 	displayKey: "value"
// 	});

// });
// 



var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};

var icd9 = new Bloodhound({
	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('description'),
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	prefetch: '../codes/icd9_diagnosis_codes.json',
	remote: '../codes/icd9_diagnosis_codes.json'
});

var icd10 = new Bloodhound({
	datumTokenizer: Bloodhound.tokenizers.obj.whitespace('description'),
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	prefetch: '../codes/icd10_diagnosis_codes.json',	
	remote: '../codes/icd10_diagnosis_codes.json'
}); 

icd9.initialize();
icd10.initialize();

$('#dataset .typeahead').typeahead({
	highlight: true,
	hint: true
},
	{
	name: 'icd9codes',
	displayKey: 'description',
	source: icd9.ttAdapter(),
	templates: {
		header: '<h3 class="icd9header">ICD-9 Codes</h3>'
	}
},
{
	name: 'icd10codes',
	displayKey: 'description',
	source: icd10.ttAdapter(),
	templates: {
		header: '<h3 class="icd10header">ICD-10 Codes</h3>'
	}
});
 
// var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
//   'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
//   'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
//   'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
//   'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
//   'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
//   'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
//   'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
//   'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
// ];
 
// $('#the-basics .typeahead').typeahead({
//   hint: true,
//   highlight: true,
//   minLength: 1
// },
// {
//   name: 'states',
//   displayKey: 'value',
//   source: substringMatcher(states)
// });