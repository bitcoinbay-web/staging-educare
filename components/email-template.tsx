import * as React from 'react';

interface EmailTemplateProps {
  toName: string;
  urlLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  toName,
  urlLink,
}) => (
  <div>
    <p>Dear {toName}</p> 
    <p>Please complete the form at the following link:</p>
    <a href={urlLink}>{urlLink}</a>
    <p>Thank you!</p>
  </div>
);
