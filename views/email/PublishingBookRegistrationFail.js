const PublishingBookRegistrationFail = (author, title) => `
<p>
  Hi <b>${author}</b>,
</p>
  <span>
  Your NFT Book <b>${title}</b> is not approved. <br/>
  Please tryanother version.
  </span>
  <hr />
`;

module.exports = PublishingBookRegistrationFail;
