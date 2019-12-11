const locations = ['A', 'B', 'C', 'S', 'Perimeter', 'Front Gate', 'Kitchen', 'Yard'];

const securityClearances = ['A', 'G', 'P5', 'P4', 'P3', 'P2', 'P1'];

const securitySubsets = {
    A: securityClearances,
    G: securityClearances.slice(1),
    P5: securityClearances.slice(2),
    P4: securityClearances.slice(3),
    P3: securityClearances.slice(4),
    P2: securityClearances.slice(5),
    P1: securityClearances[6]
};

function hasClearance(requiredClearance, actualClearance) {
    return securitySubsets[actualClearance].includes(requiredClearance)
}

module.exports = {locations: locations, securityClearances: securityClearances, hasClearance: hasClearance};