namespace PortfolioBackend.Models
{
    /// <summary>
    /// Generic paginated response wrapper
    /// </summary>
    /// <typeparam name="T">Type of data being paginated</typeparam>
    public class PaginatedResponse<T>
    {
        /// <summary>
        /// The data items for the current page
        /// </summary>
        public List<T> Data { get; set; } = new List<T>();

        /// <summary>
        /// Current page number (1-based)
        /// </summary>
        public int Page { get; set; }

        /// <summary>
        /// Number of items per page
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// Total number of items across all pages
        /// </summary>
        public int TotalCount { get; set; }

        /// <summary>
        /// Total number of pages
        /// </summary>
        public int TotalPages { get; set; }

        /// <summary>
        /// Whether there is a next page available
        /// </summary>
        public bool HasNextPage { get; set; }

        /// <summary>
        /// Whether there is a previous page available
        /// </summary>
        public bool HasPreviousPage => Page > 1;
    }
}