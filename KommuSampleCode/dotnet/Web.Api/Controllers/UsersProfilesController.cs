using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Requests;
using Sabio.Models.UserProfiles;
using Sabio.Services;
using Sabio.Services.UserProfiles;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/userProfiles")]
    [ApiController]
    public class UsersProfilesController : BaseApiController
    {
        private IUserProfilesServices _service = null;
        private IAuthenticationService<int> _authService = null;
        public UsersProfilesController(IUserProfilesServices service
            , ILogger<UsersProfilesController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<UserProfile>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                UserProfile aProfile = _service.GetById(id);

                if (aProfile == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<UserProfile> { Item = aProfile };
                }
            }


            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Errors: {ex.Message}");
            }


            return StatusCode(iCode, response);
        }

        [HttpGet("current")]
        public ActionResult<ItemResponse<UserProfile>> GetCurrent()
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                IUserAuthData user = _authService.GetCurrentUser();

                UserProfile aProfile = _service.GetCurrentUser(user.Id);

                if (aProfile == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<UserProfile> { Item = aProfile };
                }
            }


            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Errors: {ex.Message}");
            }


            return StatusCode(iCode, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemsResponse<Paged<UserProfile>>> GetByPage(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                Paged<UserProfile> paged = _service.GetUserProfileAll(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Application resources not found"));
                }
                else
                {
                    ItemResponse<Paged<UserProfile>> response = new ItemResponse<Paged<UserProfile>>();
                    response.Item = paged;
                    result = Ok(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet("search")]
        public ActionResult<ItemsResponse<Paged<UserProfile>>> Search(int pageIndex, int pageSize, string query)
        {
            ActionResult result = null;

            try
            {
                Paged<UserProfile> paged = _service.Search(pageIndex, pageSize, query);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Application resources not found"));
                }
                else
                {
                    ItemResponse<Paged<UserProfile>> response = new ItemResponse<Paged<UserProfile>>();
                    response.Item = paged;
                    result = Ok(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(UserProfileAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                IUserAuthData user = _authService.GetCurrentUser();

                int id = _service.AddProfile(model,user.Id);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);

            }

            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());

                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);

            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(UserProfileUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                IUserAuthData user = _authService.GetCurrentUser();
                _service.UpdateProfile(model,user.Id);

                response = new SuccessResponse();

            }

            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());

            }
            return StatusCode(iCode, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                IUserAuthData user = _authService.GetCurrentUser();
                _service.DeleteProfile(id,user.Id);

                response = new SuccessResponse();

                return Ok(response);
            }

            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
}
