/**
 * @type {{ PENDING:"PENDING",ACCEPTED:"ACCEPTED", REJECTED:"REJECTED" } as const}
 */
export const RequestStatusEnum = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

export const AvailableRequestStatusProviders = Object.values(RequestStatusEnum);
