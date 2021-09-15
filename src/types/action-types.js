export const Actions = {
    IssueBadge: Symbol('ISSUE_BADGE_ACTION'),
  }
  
  const symbolMapping = {
    Issue: Actions.IssueBadge,
  }
  
  const stringMapping = {
    [Actions.IssueBadge]: 'issueBadge',
  }
  
  export function convertFromString(str) {
    return symbolMapping[str]
  }
  
  export function convertToString(symbol) {
    return stringMapping[symbol]
  }
  