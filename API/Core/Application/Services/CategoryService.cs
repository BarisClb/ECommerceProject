using Application.Repositories;
using Application.Responses;
using Application.Dtos.Request;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Dtos.Response;

namespace Application.Services
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

        public async Task<BaseResponse> Get()
        {
            IQueryable<Category> categories = _categoryReadRepository.GetAll(false);
            IQueryable<CategoryReadVm> mappedCategories = categories.Select(category => new CategoryReadVm
            {
                CategoryId = category.Id,
                Name = category.Name,
                Description = category.Description,
                DateCreated = category.DateCreated,
                DateUpdated = category.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<CategoryReadVm>>(mappedCategories);
        }

        public async Task<BaseResponse> Get(int id)
        {
            Category category = await _categoryReadRepository.GetByIdAsync(id, false);
            if (category == null)
                return new FailResponse("Category does not exist.");

            CategoryReadVm mappedCategory = new()
            {
                CategoryId = category.Id,
                Name = category.Name,
                Description = category.Description,
                DateCreated = category.DateCreated,
                DateUpdated = category.DateUpdated,
            };

            return new SuccessfulResponse<CategoryReadVm>("Category created.", mappedCategory);
        }

        public async Task<BaseResponse> Post(CategoryCreateVm modelCategory)
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
            Category category = await _categoryReadRepository.GetByIdAsync(modelCategory.CategoryId);
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
