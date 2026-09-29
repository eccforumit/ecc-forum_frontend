import useSWR from 'swr';

const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return response.json();
  } catch (error) {
    // console.error removed for production
    throw error instanceof Error 
      ? error 
      : new Error('Une erreur inattendue s\'est produite lors de la communication avec le serveur.');
  }
};

export function useProfile(id?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/cv/${id}` : null,
    fetcher
  );

  return {
    profile: data?.data,
    isLoading,
    isError: error,
    mutate
  };
}

export function useOpportunities(companyId?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    companyId
      ? `/api/opportunities?companyId=${companyId}`
      : '/api/opportunities',
    fetcher
  );

  return {
    opportunities: data?.data || [],
    isLoading,
    isError: error,
    mutate
  };
}

export function useOpportunity(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/opportunities/${id}` : null,
    fetcher
  );

  return {
    opportunity: data?.data,
    isLoading,
    isError: error,
    mutate
  };
}

export function useCompanyProfile(id?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/company/${id}` : '/api/company/profile',
    fetcher
  );

  return {
    company: data?.data,
    isLoading,
    isError: error,
    mutate
  };
}
