import { API_BASE_URL } from "@constants/index"
import useSWR, { KeyedMutator } from "swr"

type useFetchReturnType<T> = {
  loading: boolean
  error: string
  data: T | undefined
  mutate: KeyedMutator<any>
}
export const fetcher = (url: string, ...args: any) => fetch(url, ...args).then((res) => res.json())

const useFetch = <T,>(
  uriProps?: string | undefined,
  shouldFetch = true,
  disableAutoRefetch = false
): useFetchReturnType<T> => {
  const { data, error, mutate } = useSWR(
    shouldFetch ? `${API_BASE_URL}${uriProps}` : null,
    fetcher,
    disableAutoRefetch
      ? {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false
        }
      : {}
  )

  return {
    loading: !error && !data,
    data,
    error,
    mutate
  }
}

export default useFetch
