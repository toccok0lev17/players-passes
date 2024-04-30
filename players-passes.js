const passes = [
    {
        result: "incomplete",
        receiver: "Demaryius Thomas",
        distance: 0.7
    },
    {
        result: "complete",
        receiver: "Tim Patrick",
        distance: 0.9
    },
    {
        result: "complete",
        receiver: "Demaryius Thomas",
        distance: 0.3
    },
    {
        result: "incomplete",
        receiver: "Tim Patrick",
        distance: 0.9
    },
    {
        result: "incomplete",
        receiver: "Tim Patrick",
        distance: 0.8
    },
    {
        result: "complete",
        receiver: "Demaryius Thomas",
        distance: 0.1
    },
    {
        result: "interception",
        receiver: "Demaryius Thomas",
        distance: 0.4
    }
];

const longDistancePass = passes.reduce((prev, current) =>
    current.result === "complete" && (!prev || prev.value <= current.distance) ? {
        player: current.receiver,
        value: current.distance
    } : prev, null);

const percentageByReceiver = Object.entries(passes.reduce((acc, { result, receiver }) => {
    acc[receiver] = acc[receiver] || { total: 0, complete: 0 };
    acc[receiver].total++;
    acc[receiver].complete += result === "complete" ? 1 : 0;
    return acc;
}, {})).reduce((acc, [receiver, { total, complete }]) => {
    const value = Math.round((complete / total) * 100);
    return !acc || acc.value < value ? { player: receiver, value } : acc;
}, null);