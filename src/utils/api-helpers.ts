/**
 * Utility functions for handling API requests
 */

/**
 * Makes a request to the API with retry capability for rate limiting
 * @param url API endpoint URL
 * @param options Fetch options
 * @param maxRetries Maximum number of retries (default: 3)
 * @param initialDelay Initial delay in ms before retry (default: 1000ms)
 * @returns Promise with the response
 */
export async function fetchWithRetry(
    url: string,
    options: RequestInit,
    maxRetries = 2,
    initialDelay = 1000
): Promise<Response> {
    let retries = 0
    let delay = initialDelay

    while (true) {
        try {
            const response = await fetch(url, options)

            // If response is OK or it's not a rate limit error, return the response
            if (response.ok || response.status !== 429) {
                return response
            }

            // If we've reached max retries, throw the error
            if (retries >= maxRetries) {
                return response
            }

            // Get retry-after header if available, or use exponential backoff
            const retryAfter = response.headers.get('retry-after')
            const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : delay

            console.log(`Rate limited. Retrying in ${waitTime}ms...`)

            // Wait for the specified time
            await new Promise((resolve) => setTimeout(resolve, waitTime))

            // Increase retry count and delay for exponential backoff
            retries++
            delay *= 2 // Exponential backoff
        } catch (error) {
            // If there's a network error, retry if we haven't exceeded max retries
            if (retries >= maxRetries) {
                throw error
            }

            await new Promise((resolve) => setTimeout(resolve, delay))
            retries++
            delay *= 2 // Exponential backoff
        }
    }
}
