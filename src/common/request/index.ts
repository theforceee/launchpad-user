import { clearAccountToken, getAccountToken } from "@utils/index"

interface RequestOptions {
  body?: Record<string, unknown>
  account?: `0x${string}` | undefined
}

export const request = async (url: string, method: string, options?: RequestOptions) => {
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json"
  })

  if (!!options?.account) {
    const token = getAccountToken(options.account)
    headers.append("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(`/api/api/v2/user/${url}`, {
    method,
    headers,
    credentials: "include",
    body: options?.body ? JSON.stringify(options.body) : undefined
  })

  if (!response.ok) {
    // throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    console.log(`HTTP ${response.status} - ${response.statusText}`)
    return response
  }

  // Unauthorized
  if (response.status === 401) {
    clearAccountToken(options?.account)
    // sign again
  }

  return response.json()
}

export async function get(url: string, options?: RequestOptions) {
  return request(url, "GET", options)
}

export async function post(url: string, options?: RequestOptions) {
  return request(url, "POST", options)
}

export async function put(url: string, options?: RequestOptions) {
  return request(url, "PUT", options)
}
