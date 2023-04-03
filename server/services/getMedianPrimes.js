

const getMedianPrimes = (n) => {
    if (!Number.isInteger(n)) {
        throw new Error("Incorrect input type")
    }
    if (n < 2) {
        return []
    }
    const primes = getPrimes(n)
    const medianprime = getMedian(primes)
    return medianprime
}

function getPrimes(n) {
    let isPrime = new Array(n + 1).fill(true);

    isPrime[1] = false;

    // only checking odd numbers, evens are non prime 
    for (let i = 3; i * i <= n; i += 2) {
        if (isPrime[i]) {
            //only check odd nums
            for (let j = i * i; j <= n; j += 2 * i) {
                isPrime[j] = false;
            }
        }
    }

    let primes = [2]
    for (let i = 3; i <= n; i += 2) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }
    return primes
}

function getMedian(primes) {
    let median = [];
    if (primes.length === 0) {
        return []
    }
    if (primes.length % 2 === 0) {
        let mid = primes.length / 2
        median.push(primes[mid - 1])
        median.push(primes[mid])
    } else {
        median.push(primes[Math.floor(primes.length / 2)])
    }

    return median
}

export default getMedianPrimes;
