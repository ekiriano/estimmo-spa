import React, { Component } from "react";
import classnames from "classnames";

class Step3Appartement extends Component {
  render() {
    const errors = this.props.errors;
    if (this.props.currentStep !== 3) {
      return null;
    }
    return (
      <div>
        <h1>Etape 3 - </h1>

        <div className="field">
          <div className="control">
            <input
              className={classnames("input is-medium", {
                "is-danger": errors.etage
              })}
              type="number"
              name="etage"
              placeholder="Etage"
              value={this.props.etage}
              onChange={this.props.onChange}
              min="0"
              max={this.props.nombre_etage_total}
              required
            />
            {errors.etage && (
              <p class="help is-danger">{errors.etage}</p>
            )}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className={classnames("input is-medium", {
                "is-danger": errors.nombre_etage_total
              })}
              type="number"
              name="nombre_etage_total"
              placeholder="nombre etage total"
              value={this.props.nombre_etage_total}
              onChange={this.props.onChange}
              min="0"
              
              required
            />
            {errors.nombre_etage_total && (
              <p class="help is-danger">{errors.nombre_etage_total}</p>
            )}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className={classnames("input is-medium", {
                "is-danger": errors.annee_construction
              })}
              type="number"
              name="annee_construction"
              placeholder="annee construction"
              value={this.props.annee_construction}
              onChange={this.props.onChange}
              min="0"
              max={new Date().getFullYear()}
              required
            />
            {errors.annee_construction && (
              <p class="help is-danger">{errors.annee_construction}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Step3Appartement;

