const Documents = require('../documentModel');
const Requests = require('../../requests/requestsModel');

const checkIfDocumentExists = async (req, res, next) => {
  const { id } = req.params;

  try {
    let document = await Documents.findById(id);

    if (document.length == 0) {
      return res
        .status(404)
        .json({ message: `Document with id of ${id} does not exist` });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const checkDocumentCompletion = async (req, res, next) => {
  const { requestId, category } = req.body;

  const docChecks = {
    childrenOrPregnancy: false,
    residency: false,
    income: false,
    housingInstability: false,
    covid: false,
  };

  //Update status of current document being processed
  docChecks[category] = true;

  //Check agains other docs assigned to req - skipping any 'other' docs
  try {
    const request = await Requests.findById(requestId);

    if (request.requestStatus !== 'documentsNeeded') {
      console.log(`Request status: ${request.requestStatus} -- next`);
      next();
    }

    const requestDocs = await Documents.findByRequestId(requestId);

    requestDocs.forEach((doc) => {
      if (
        (doc.status === 'received' || doc.status === 'optOut') &&
        doc.category !== 'other'
      ) {
        docChecks[doc.category] = true;
      }
    });

    //Check to see if docChecks has any false values
    var hasFalseDocs = Object.keys(docChecks).some((key) => !docChecks[key]);

    //No false's --> update doc status
    if (!hasFalseDocs) {
      console.log('No Falses Reached');
      await Requests.update(requestId, {
        requestStatus: 'verifyingDocuments',
        incomplete: false,
      });
    }

    next();
  } catch (error) {
    console.log('Error in status middleware', error);
    next();
  }
};

module.exports = { checkIfDocumentExists, checkDocumentCompletion };
