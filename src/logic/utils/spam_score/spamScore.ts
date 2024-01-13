export const getSpamRating = (spamCount: number, savedContactsCount: number): string => {
    if (savedContactsCount <= spamCount) return 'not spam';

    const score: number = (spamCount * 100) / savedContactsCount;

    if (score < 20) return 'not spam';
    if (score < 40) return 'low spam';
    if (score < 60) return 'medium spam';
    if (score < 80) return 'high spam';

    return 'is spam';
}
