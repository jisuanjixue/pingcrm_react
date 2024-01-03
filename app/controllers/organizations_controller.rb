class OrganizationsController < ApplicationController
  # Let CanCanCan load and authorize the instance variables
  load_and_authorize_resource

  def index
    begin
      pagy, paged_organizations = pagy(@organizations.search(params[:search]).trash_filter(params[:trashed]).order(:name))
    rescue Pagy::OverflowError
      pagy = Pagy.new(count: @organizations.count, page: params[:page], items: params[:items])
      paged_organizations = @organizations.offset(pagy.offset).limit(pagy.items)
    end

    render inertia: "Organizations/index",
           props: {
             organizations:
               jbuilder do |json|
                 json.data(paged_organizations, :id, :name, :phone, :city, :deleted_at)
                 json.meta pagy_metadata(pagy)
               end,
             filters: params.slice(:search, :trashed),
             total: @organizations.count
           }
   end
  def show
    render inertia: "Organizations/EditForm",
           props: {
             organization: jbuilder do |json| json.(@organization, :id, :name, :email, :phone, :address, :city, :region, :country, :postal_code, :deleted_at) end,
             contacts: -> { jbuilder { |json| json.array! @organization.contacts.order_by_name, :id, :name, :phone, :city, :deleted_at } },
           }
  end

  def edit
    render inertia: "Organizations/edit",
           props: {
             organization: jbuilder do |json| json.(@organization, :id, :name, :email, :phone, :address, :city, :region, :country, :postal_code, :deleted_at) end,
             contacts: -> { jbuilder { |json| json.array! @organization.contacts.order_by_name, :id, :name, :phone, :city, :deleted_at } },
           }
  end

  def create
    if @organization.update(organization_params)
      redirect_to organizations_path, notice: "Organization created."
    else
      redirect_to organizations_path, inertia: { errors: @organization.errors }
    end
  end

  def update
    if @organization.update(organization_params)
      redirect_to organizations_path, notice: "Organization updated."
    else
      redirect_to organizations_path, inertia: { errors: @organization.errors }
    end
  end

  def destroy
    if @organization.soft_delete
      if can? :edit, @organization
        redirect_to organizations_path, notice: "Organization deleted."
      else
        redirect_to organizations_path, inertia: { errors: @organization.errors }
      end
    else
      redirect_to organizations_path, inertia: { errors: @organization.errors }
    end
  end

  def restore
    if @organization.restore
      redirect_to edit_organization_path(@organization), notice: "Organization restored."
    else
      redirect_to edit_organization_path(@organization), alert: "Organization cannot be restored!"
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def organization_params
    params.fetch(:organization, {}).permit(:name, :email, :phone, :address, :city, :region, :country, :postal_code)
  end
end
