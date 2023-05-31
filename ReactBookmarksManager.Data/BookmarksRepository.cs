using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactBookmarksManager.Data
{
    public class BookmarksRepository
    {
        private readonly string _connectionString;

        public BookmarksRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Bookmark> GetBookmarksById(int id)
        {
            using var context = new BookmarksManagerDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == id).ToList();
        }
        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new BookmarksManagerDataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }

        public void UpdateBookmark(int id, string title)
        {
            using var context = new BookmarksManagerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated(
                $"UPDATE Bookmarks SET Title = {title} WHERE Id = {id}");
        }

        public void DeleteBookmark(int bookmarkId)
        {
            using var context = new BookmarksManagerDataContext(_connectionString);
            var bookmark = context.Bookmarks.FirstOrDefault(b => b.Id == bookmarkId);
            if (bookmark != null)
            {
                context.Bookmarks.Remove(bookmark);
                context.SaveChanges();
            }
        }

        public List<object> GetTopBookmarks()
        {
            using var context = new BookmarksManagerDataContext(_connectionString);

            var topBookmarks = context.Bookmarks
                .GroupBy(b => b.Url)
                .Select(group => new
                {
                    Bookmark = group.First(),
                    Count = group.Count()
                })
                .OrderByDescending(group => group.Count)
                .Take(5)
                .ToList();

            return topBookmarks.Select(group => new
            {
                group.Bookmark,
                group.Count
            })
            .Cast<object>()
            .ToList();
        }



    }
}
