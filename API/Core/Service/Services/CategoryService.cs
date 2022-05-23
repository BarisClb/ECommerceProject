using Application.Repositories;
using Application.Utilities.Validators;
using Domain.Entities;
using Domain.Responses;
using Infrastructure.Dtos.Common;
using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Response;
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

        public async Task<SortedResponse<IList<CategoryReadVm>, ListSortReadVm>> Get(ListSortWriteVm listSorting)
        {
            // Search Word
            IList<Category> categories;
            if (!string.IsNullOrWhiteSpace(listSorting.SearchWord))
            {
                categories = _categoryReadRepository.GetWhere(c => c.Name.Contains(listSorting.SearchWord)).ToList();
            }
            else
            {
                categories = _categoryReadRepository.GetAll(false).ToList();
            }
            // Sort => Reverse? => OrderBy?
            IList<Category> orderedCategories;
            if (listSorting.Reversed)
            {
                orderedCategories = listSorting.OrderBy switch
                {
                    "Name" => categories.OrderByDescending(c => c.Name).ToList(),
                    // "ProductCount" => categories.OrderByDescending(c => c.Products.Count).ToList(),
                    _ => categories.Reverse().ToList(),
                };
            }
            else
            {
                orderedCategories = listSorting.OrderBy switch
                {
                    "Name" => categories.OrderBy(c => c.Name).ToList(),
                    // "ProductCount" => categories.OrderBy(c => c.Products.Count).ToList(),
                    _ => categories,
                };
            }
            // Pagination and Mapping
            if (listSorting.PageSize == 0)
                listSorting.PageSize = categories.Count;

            IList<CategoryReadVm> mappedCategories = orderedCategories.Skip((listSorting.PageNumber - 1) * listSorting.PageSize).Take(listSorting.PageSize).Select(category => new CategoryReadVm
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                DateCreated = category.DateCreated,
                DateUpdated = category.DateUpdated,
            }).ToList();

            return new SortedResponse<IList<CategoryReadVm>, ListSortReadVm>(mappedCategories, new ListSortReadVm(listSorting.SearchWord, listSorting.PageNumber, listSorting.PageSize, categories.Count, listSorting.Reversed, listSorting.OrderBy));
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
            // Trim and Replace Multiple Whitespaces
            modelCategory.Name = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelCategory.Name);
            modelCategory.Description = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelCategory.Description);

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
            {
                modelCategory.Name = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelCategory.Name);
                category.Name = modelCategory.Name;
            }
            if (modelCategory.Description != null)
            {
                modelCategory.Description = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelCategory.Description);
                category.Description = modelCategory.Description;
            }

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
