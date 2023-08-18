type SetErrorType = (data: Record<string, boolean>) => void;

export const validateEmail = (email: string) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
};

export const validatePassword = (password: string) => {
  const validate = /^((?=.*\d)|(?=.*[!@#$%^&*]))(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return validate.test(password);
};

export const validateNonEmpty = (data: string) => {
  const trimed = data ? data.toString().trim() : null;
  if (!trimed) {
    return !!data;
  }
  return trimed.length > 0;
};

export const validatePhone = (data: string) => {
  return /^[0-9]{11}$/.test(data);
};

export const validatePin = (data: string) => {
  return /^[0-9]{6}$/.test(data);
};

export const validateSmartCard = (data: string) => {
  return /^[0-9]{11}$/.test(data);
};

export const validatePostPaid = (data: string) => {
  return /^[0-9]{12}$/.test(data);
};

export const validatePrePaid = (data: string) => {
  return /^[0-9]{11}$/.test(data);
};

export const validateAmount = (data: string) => {
  return !isNaN(parseFloat(data)) || parseFloat(data) > 0;
};

export const validateBeneficiaryData = (
  data: Record<string, string>,
  setErrorState: SetErrorType,
) => {
  const {amount, debitAccountId, beneficiaryId, narration} = data;
  const amountIsValid = validateAmount(amount);
  const debitAccountIdIsValid = validateNonEmpty(debitAccountId);
  const beneficiaryIdIsValid = validateNonEmpty(beneficiaryId);
  const narrationIsValid = validateNonEmpty(narration);
  setErrorState({
    amount: !amountIsValid,
    debitAccountId: !debitAccountIdIsValid,
    beneficiaryId: !beneficiaryIdIsValid,
    narration: !narrationIsValid,
  });
  return (
    amountIsValid &&
    debitAccountIdIsValid &&
    beneficiaryIdIsValid &&
    narrationIsValid
  );
};

export const validateNonBeneficiaryData = (
  data: Record<string, string>,
  setErrorState: SetErrorType,
) => {
  const {amount, debitAccountId, nameEnquiryReference, narration} = data;
  const amountIsValid = validateAmount(amount);
  const debitAccountIdIsValid = validateNonEmpty(debitAccountId);
  const nameEnquiryReferenceIsValid = validateNonEmpty(nameEnquiryReference);
  const narrationIsValid = validateNonEmpty(narration);
  setErrorState({
    amount: !amountIsValid,
    debitAccountId: !debitAccountIdIsValid,
    beneficiaryId: !nameEnquiryReferenceIsValid,
    narration: !narrationIsValid,
  });
  return (
    amountIsValid &&
    debitAccountIdIsValid &&
    nameEnquiryReferenceIsValid &&
    narrationIsValid
  );
};
