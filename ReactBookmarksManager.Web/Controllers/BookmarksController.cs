using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactBookmarksManager.Data;
using ReactBookmarksManager.Web.ViewModels;

namespace ReactBookmarksManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarksController : ControllerBase
    {
        private string _connectionString;

        public BookmarksController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Authorize]
        [HttpGet]
        [Route("getbookmarksbyuser")]
        public List<Bookmark> GetBookmarksById()
        {
            var repo = new BookmarksRepository(_connectionString);
            var user = GetCurrentUser();
            return repo.GetBookmarksById(user.Id);
        }

        [Authorize]
        [HttpPost]
        [Route("addbookmark")]
        public void AddBookmark(Bookmark bookmark)
        {
            var user = GetCurrentUser();

            var repo = new BookmarksRepository(_connectionString);
            bookmark.UserId = user.Id;
            repo.AddBookmark(bookmark);
        }

        
        [HttpGet]
        [Route("gettopbookmarks")]
        public List<Object> GetTopBookmarks()
        {
            var repo = new BookmarksRepository(_connectionString);
            return repo.GetTopBookmarks();

        }
        public User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            var repo = new UserRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }


        [Authorize]
        [HttpPost]
        [Route("deletebookmark")]
        public void DeleteBookmark(int id)
        {
            var repo = new BookmarksRepository(_connectionString);
            repo.DeleteBookmark(id);
        }

        [Authorize]
        [HttpPost]
        [Route("updatebookmark")]
        public void UpdateBookmark(UpdateTitleViewModel vm)
        {
            var repo = new BookmarksRepository(_connectionString);
            repo.UpdateBookmark(vm.Id, vm.Title);
        }
    }
}
