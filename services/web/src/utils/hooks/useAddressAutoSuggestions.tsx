import { useState, useEffect } from 'react';

const SmartyStreetsSDK = require('smartystreets-javascript-sdk');
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocompletePro.Lookup;

let key = process.env.REACT_APP_SMARTY_KEY;

const credentials = new SmartyStreetsCore.SharedCredentials(key);

let clientBuilder = new SmartyStreetsCore.ClientBuilder(
  credentials
).withLicenses(['us-autocomplete-pro-cloud']);

let client = clientBuilder.buildUsAutocompleteProClient();

const useAddressAutoSuggestions = initialState => {
  const [autosuggestions, setAutosuggestions] = useState(initialState);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = address => {
    setSearchTerm(address);
  };

  useEffect(() => {
    if (!searchTerm) return;

    let lookup = new Lookup(searchTerm);

    lookup.maxResults = 5;
    lookup.preferStates = ['WA'];

    const delayDebounceFn = setTimeout(() => {
      client
        .send(lookup)
        .then(function(results) {
          setAutosuggestions(results.result);
        })
        .catch(console.log);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return [autosuggestions, handleSearch];
};

export default useAddressAutoSuggestions;
