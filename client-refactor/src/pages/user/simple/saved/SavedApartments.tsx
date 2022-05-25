/** @jsxImportSource @emotion/react */
import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  Button,
  FullPageSpinner,
  Link,
  PropertyCard,
  PropertyList,
  PropertyListItem,
} from "../../../../components/lib";
import { ApartmentService } from "../../../../services/properties/apartment.service";
import { IApartmentProperty } from "../estimations/PropertyType";
/* eslint-disable */
export const SavedApartments = () => {
  const queryClient = useQueryClient();
  const apartmentService = new ApartmentService();

  const {
    data: savedApartments,
    isLoading,
    isSuccess,
  } = useQuery("savedApartments", () => apartmentService.getAll());

  const { mutate: remove } = useMutation(
    ({ id }: { id: string }) => apartmentService.delete(id),
    {
      onMutate(removedProperty) {
        const previousProperties = queryClient.getQueryData("savedApartments");

        queryClient.setQueryData("savedApartments", (old: any) => {
          return old.filter(
            (property: IApartmentProperty) =>
              property._id !== removedProperty.id
          );
        });

        return () =>
          queryClient.setQueriesData("savedApartments", previousProperties);
      },
      onSettled: () => queryClient.invalidateQueries("savedApartments"),
      onError: (err, variables, recover) =>
        typeof recover === "function" ? recover() : null,
    }
  );
  //To do : style the list of saved properties
  return (
    <div>
      <h2
        css={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "2rem" }}
      >
        Estimated Apartments
      </h2>
      {isLoading && <FullPageSpinner />}

      {isSuccess && savedApartments?.length !== 0 ? (
        <PropertyList>
          {savedApartments.map((property: IApartmentProperty) => (
            <PropertyListItem key={property._id}>
              <PropertyCard>
                <header className="card-header">
                  <p className="card-header-title">
                    <b>
                      Addresse : {property.rue}, {property.code_postal}{" "}
                      {property.ville}
                    </b>
                  </p>
                </header>
                <div
                  css={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <div>
                    <p>Area : {property.surface}m²</p>
                  </div>
                  <div>
                    <p>Construction Year : {property.annee_construction}</p>
                  </div>
                </div>
                <Button
                  css={{ width: "100%" }}
                  variant="danger"
                  onClick={() => remove({ id: property._id })}
                >
                  Delete
                </Button>
              </PropertyCard>
            </PropertyListItem>
          ))}
        </PropertyList>
      ) : (
        <div>
          <p>
            You don't have any estimations for now
            <Link css={{ marginLeft: "1rem" }} to="/apartment">
              new Estimation
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};