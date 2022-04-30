using Application.Repositories;
using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Response;
using Infrastructure.Dtos.Common;
using Domain.Responses;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CategoryService
    {
        readonly private ICategoryWriteRepository _categoryWriteRepository;
        readonly private ICategoryReadRepository _categoryReadRepository;

        public CategoryService(
            ICategoryWriteRepository categoryWriteRepository,
            ICategoryReadRepository categoryReadRepository)

        {
            _categoryWriteRepository = categoryWriteRepository;
            _categoryReadRepository = categoryReadRepository;
        }

        public async Task<PagedResponse<IList<CategoryReadVm>>> Get(Pagination pagination)
        {
            IList<Category> categories = _categoryReadRepository.GetAll(false).ToList();
            IList<CategoryReadVm> mappedCategories = categories.Skip((pagination.PageNumber - 1 ) * pagination.PageSize).Take(pagination.PageSize).Select(category => new CategoryReadVm
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                DateCreated = category.DateCreated,
                DateUpdated = category.DateUpdated,
            }).ToList();

            return new PagedResponse<IList<CategoryReadVm>>(mappedCategories, categories.Count, pagination.PageNumber, pagination.PageSize);
        }

        public async Task<BaseResponse> Get(int id)
        {
            Category category = await _categoryReadRepository.GetByIdAsync(id, false);
            if (category == null)
                return new FailResponse("Category does not exist.");

            CategoryReadVm mappedCategory = new()
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                DateCreated = category.DateCreated,
                DateUpdated = category.DateUpdated,
            };

            return new SuccessfulResponse<CategoryReadVm>("Category created.", mappedCategory);
        }

        public async Task<SuccessfulResponse<Category>> Post(CategoryCreateVm modelCategory)
        {
            await _categoryWriteRepository.AddAsync(new()
            {
                Name = modelCategory.Name,
                Description = modelCategory.Description
            });

            await _categoryWriteRepository.SaveAsync();
            return new SuccessfulResponse<Category>("Category created.");
        }

        public async Task<BaseResponse> Put(CategoryUpdateVm modelCategory)
        {
            Category category = await _categoryReadRepository.GetByIdAsync(modelCategory.Id);
            if (category == null)
                return new FailResponse("Category does not exist.");

            if (modelCategory.Name != null)
                category.Name = modelCategory.Name;
            if (modelCategory.Description != null)
                category.Description = modelCategory.Description;

            await _categoryWriteRepository.SaveAsync();
            return new SuccessfulResponse<Category>("Category updated.");
        }

        public async Task<BaseResponse> Delete(int id)
        {
            if (await _categoryReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Category does not exist.");

            await _categoryWriteRepository.RemoveAsync(id);
            await _categoryWriteRepository.SaveAsync();
            return new SuccessfulResponse<Category>("Category deleted.");
        }
    }
}
