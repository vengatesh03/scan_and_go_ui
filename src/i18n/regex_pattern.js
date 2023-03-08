const REGEX = {
  ipRegex: null,
  nameOnlyRegex: null,
  portRegex: null,
  unicastRegex: null,
  nameNumericRegex: null,
  OnlyLower: null,
  OnlyEmail: null,
  smallAndNumber: null,
}

REGEX.ipRegex = function (ip) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
    return true
  } else {
    return false
  }
}

REGEX.OrgName = function (name) {
  if (/^[A-Za-z 1-9\)\(_-]+$/.test(name)) {
    return true
  } else {
    return false
  }
}

REGEX.nameOnlyRegex = function (name) {
  if (/^[A-Za-z ]+$/.test(name)) {
    return true
  } else {
    return false
  }
}

REGEX.OnlyLower = function (name) {
  if (/^[a-z ]+$/.test(name)) {
    return true
  } else {
    return false
  }
}

REGEX.OnlyEmail = function (name) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(name)) {
    //  if (/^[a-z@.]+$/.test(name)) {
    return true
  } else {
    return false
  }
}

REGEX.nameNumericRegex = function (name) {
  if (/^[A-Za-z1-9 ]+$/.test(name)) {
    return true
  } else {
    return false
  }
}

REGEX.portRegex = function (port) {
  if (/^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$/.test(port)) {
    return true
  } else {
    return false
  }
}

REGEX.unicastRegex = function (port) {
  if (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(port)) {
    return true
  } else {
    return false
  }
}

REGEX.smallAndNumber = function (name) {
  if (/^[a-z0-9]+$/.test(name)) {
    return true
  } else {
    return false
  }
}
export default REGEX
