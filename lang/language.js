var lang = "en"

const langs = {
  short_langs: ['en', 'pt', 'fr'],
  long_langs: {
    en: 'English',
    pt: 'Português',
    fr: 'Français'
  },
  requestURL: {
    en: './lang/en.json',
    pt: './lang/pt.json',
    fr: './lang/fr.json'
  }
}

function changeLanguage(language, first) {
  lang = language;
  var request = new XMLHttpRequest();
  request.open('GET', langs.requestURL[lang])
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var lang_data = request.response;
    console.log(request)
    changeText(lang_data, first);
    orderDropdown(lang);
  }
}

function changeText(data, first) {
  document.getElementById("big-title").innerHTML = data["big-title"]
  document.getElementById("min-max-text").innerHTML = data["min-max-text"]
  document.getElementById("min-td").placeholder = data["min-td"]
  document.getElementById("max-td").innerHTML = data["max-td"]
  document.getElementById("validate").innerHTML = data["validate"]
  document.getElementById("generate").innerHTML = data["generate"]
  document.getElementById("current-output").innerHTML = data["current-output"]
  document.getElementById("already-shown").innerHTML = data["already-shown"]
  document.getElementById("reset").innerHTML = data["reset"]
  numbers_shown = data["err-numbers-shown"]
  input_err = data["input-err"]
  validate_input = data["err-validate-input"]
  if(!first) {
    resetAll()
  }
}

class DropdownLang {
  constructor(lang, first) {
    this.short = lang
    this.long = langs.long_langs[lang]
    this.firstXtra = first ? '&nbsp;<i class="fas fa-caret-down"></i>' : ''
  }
  createNew() {
    document.getElementsByTagName('ul')[0].innerHTML +=
    '<a href="#" onclick="changeLanguage(&quot;' + this.short + '&quot;)">' +
    '<li><img src="./lang/' + this.short + '_flag.png"/>' + this.long + this.firstXtra +
    '</li></a>'
  }
}

function orderDropdown(lang) {
  document.getElementsByTagName('ul')[0].innerHTML = ""
  var languages = [...langs.short_langs]
  new DropdownLang(lang, true).createNew()
  languages.splice(languages.indexOf(lang), 1)
  languages.forEach(function(el){
    new DropdownLang(el, false).createNew()
  })
}

document.addEventListener('DOMContentLoaded', function() {
  var locale = navigator.language.substring(0, 2)
  var displayLang = langs.short_langs.includes(locale) ? locale : 'en'
  changeLanguage(displayLang, true)
}, false);
